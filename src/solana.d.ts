interface Phantom {
    phantom: { solana: Solana };
    solana: Solana;
}

interface Solana {
    isPhantom: boolean;
    isConnected: boolean;
    connect(args?: { onlyIfTrusted: boolean }): Promise<PhantomPublicKey>;
    disconnect(): void;
    openBridge(): Promise<void>;
    postMessage(message: string): void;
    request(message: string): Promise<string>;
    signAllTransaction(message: string): Promise<string>;
    signMessage(message: string): Promise<string>;
    signTransaction(message: string): Promise<string>;
}

interface PhantomPublicKey {
    publicKey: {
        _bn: {
            words: number[];
            red: null;
            length: number;
            negative: number;
        }
    }
}
