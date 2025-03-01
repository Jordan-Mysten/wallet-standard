import type { WalletAccount } from '@wallet-standard/standard';

/** TODO: docs */
export type ConnectFeature = {
    /** Namespace for the feature. */
    'standard:connect': {
        // TODO: think about removing feature versions
        /** Version of the feature API. */
        version: ConnectVersion;

        /**
         * Connect to accounts in the wallet.
         *
         * @param input Input for connecting.
         *
         * @return Output of connecting.
         */
        connect: ConnectMethod;
    };
};

/** TODO: docs */
export type ConnectVersion = '1.0.0';

/** TODO: docs */
export type ConnectMethod = (input?: ConnectInput) => Promise<ConnectOutput>;

/** Input for connecting. */
export interface ConnectInput {
    /**
     * Set to true to request the authorized accounts without prompting the user.
     * The wallet should return only the accounts that the app is already authorized to connect to.
     */
    silent?: boolean;
}

/** Output of connecting. */
export interface ConnectOutput {
    /** List of accounts in the wallet that the app has been authorized to use. */
    accounts: ReadonlyArray<WalletAccount>;
}
