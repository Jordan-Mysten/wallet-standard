import type { SendOptions, TransactionSignature, Transaction } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import type { SolanaSignAndSendTransactionOptions } from '@wallet-standard/solana';

/**
 * TODO: docs
 */
export type SendTransaction = (
    transaction: Transaction,
    connection: Connection,
    options: SendOptions
) => Promise<TransactionSignature>;

// FIXME: add v2 tx support
/**
 * TODO: docs
 */
export async function sendAndConfirmTransaction(
    transaction: Transaction,
    endpoint: string,
    options: SolanaSignAndSendTransactionOptions = {},
    sendTransaction: SendTransaction = sendRawTransaction
): Promise<TransactionSignature> {
    const { commitment, preflightCommitment, skipPreflight, maxRetries, minContextSlot } = options;

    const connection = new Connection(endpoint, commitment || 'confirmed');

    const latestBlockhash = commitment
        ? await connection.getLatestBlockhash({
              commitment: preflightCommitment || commitment,
              minContextSlot,
          })
        : undefined;

    const signature = await sendTransaction(transaction, connection, {
        preflightCommitment,
        skipPreflight,
        maxRetries,
        minContextSlot,
    });

    if (latestBlockhash) {
        await connection.confirmTransaction(
            {
                ...latestBlockhash,
                signature,
            },
            commitment || 'confirmed'
        );
    }

    return signature;
}

// FIXME: add v2 tx support
/**
 * TODO: docs
 */
export async function sendRawTransaction(
    transaction: Transaction,
    connection: Connection,
    options?: SendOptions
): Promise<TransactionSignature> {
    return await connection.sendRawTransaction(transaction.serialize(), options);
}
