import React, { useEffect, useState } from "react";
import { has, lose, retrieve, save } from "./ls";
import './style.css';

const App = () => {
    const [wallet, setWallet] = useState<Solana | undefined>(undefined);
    const [error, setError] = useState('');
    const [connected, setConnected] = useState(false);
    const [publicKey, setPublicKey] = useState('');

    // https://docs.phantom.app/integrating/detecting-the-provider
    const checkWallet = () => {
        if (!('solana' in window)) {
            setWallet(undefined);
            return;
        }

        const { solana } = window as unknown as Phantom;
        setWallet(solana);

        if (has('publicKey')) {
            setPublicKey(retrieve('publicKey'));
            setConnected(true);

            // check if the public key is still valid
            solana.connect({ onlyIfTrusted: true }).catch(() => {
                setConnected(false);
                lose('publicKey');
            });
        }
    };

    const connect = () => {
        if (!wallet) {
            setError('wallet not found');
            return;
        }

        wallet.connect()
            .then(response => {
                const pub = response.publicKey._bn.words.join('');
                setPublicKey(pub);
                save('publicKey', pub);
                setConnected(true);
            });
    }

    useEffect(() => {
        const onLoad = async () => { checkWallet() };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    if (!wallet) {
        return <>
            <div>no wallet detected</div>

            <span>download it here:&nbsp;
                <a target="_blank" href="https://phantom.app/">
                    https://phantom.app/
                </a>
            </span>
        </>;
    }

    return <>
        {connected
            ? <><div>connected!</div>
                <code>publicKey: {publicKey}</code></>
            : <button onClick={connect}>connect</button>}

        {error && <div style={{ color: 'red' }}>error: {error}</div>}
    </>;
}

export default App;
