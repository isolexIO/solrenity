
import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer and process available globally for Solana libraries
window.Buffer = Buffer;
window.process = process;
window.global = window;
