import type { Wallet, WalletAccount } from '..';

class GlowWallet implements Wallet {
    version = '1.0.0' as const;
    name = 'Glow';
    icon = `data:image/png;base64,` as const;
    chains = ['solana:mainnet', 'solana:devnet'] as const;
    features = {
        'standard:connect': {
            connect: async () => ({ accounts: this.accounts }),
        },
        'standard:events': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            on: (event: string, listener: () => void) => () => {},
        },
        'standard:signTransaction': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signTransaction(account: WalletAccount, chain: string, transaction: Uint8Array) {},
        },
        'standard:signMessage': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signMessage(account: WalletAccount, message: Uint8Array) {},
        },
        'glow:': {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            signIn() {},
        },
    };
    accounts = [new GlowSolanaWalletAccount()];
}

class GlowSolanaWalletAccount implements WalletAccount {
    address = '';
    publicKey = new Uint8Array();
    chains = ['solana:mainnet', 'solana:devnet', 'solana:testnet', 'solana:localnet'] as const;
    features = ['standard:signMessage', 'standard:signTransaction'] as const;
}

const wallet = new GlowWallet();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const account = wallet.accounts[0]!;

await wallet.features['standard:connect'].connect();

// eslint-disable-next-line @typescript-eslint/no-empty-function
wallet.features['standard:events'].on('change', () => {});
wallet.features['standard:signTransaction'].signTransaction(account, 'solana', new Uint8Array());
wallet.features['standard:signMessage'].signMessage(account, new Uint8Array());
wallet.features['glow:'].signIn();
