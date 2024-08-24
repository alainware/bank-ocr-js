/**
 * Developer: Irving Alain Aguilar Pérez
 * Date: 2024-08-23
 * Script Name: us-01.js
 * Script Summary: This script implements a functionality to parse from OCR to digit.
 */
/* Libraries */
const { reverse } = require('dns');
const fs = require('fs');
const MAX_CHARACTERS = 27;
const MAX_LINES = 3;
/* Helper Functions */
/**
 * @description Receive a OCR string and return its equivalent digit.
 * @param {String} ocr_string 
 * @returns {String} digit
 */
const searchDigitDictionary = (ocr_string) => {
    let flat_ocr_string = ocr_string.join('');
    const flatDigitDictionary = {
        " _ | ||_|": "0",
        "    |  | ": "1",
        " _  _||_ ": "2",
        " _  _| _|": "3",
        "   |_|  |": "4",
        " _ |_  _|": "5",
        " _ |_ |_|": "6",
        " _   |  |": "7",
        " _ |_||_|": "8",
        " _ |_| _|": "9"
    };
    return flatDigitDictionary[flat_ocr_string] || '?';
}
/**
 * @description Parse a given account in OCR format into a string of digits.
 * @param {String} text_file_lines 
 * @returns {String} account
 */
const parseOcrAccount = (text_file_lines) => {
    let account = '';
    for (let index = 0; index < MAX_CHARACTERS; index += MAX_LINES) {
        const ocr_digit_matrix = [
            text_file_lines[0].substring(index, index + 3),
            text_file_lines[1].substring(index, index + 3),
            text_file_lines[2].substring(index, index + 3)
        ];
        account += searchDigitDictionary(ocr_digit_matrix);
    }
    return account;
}

const parseOcrTextFile = (text_file_content) => {
    const flat_lines = text_file_content.split('\n');
    const accounts = [];
    for (let i = 0; i < flat_lines.length; i += 4) {
        const current_account_lines = flat_lines.slice(i, i + 3);
        if (current_account_lines.length == 3) {
            const account = parseOcrAccount(current_account_lines);
            accounts.push(account);
        }
    }
    return accounts;
}

const validateCheckSum = (account) => {
    let reversed = account.split('').reverse();
    let sum = 0;
    reversed.forEach((digit, index) => {
        sum += (index + 1) * parseInt(digit);
    });
    return sum % 11 == 0;
}

const validateState = (account) => {
    let non_valid_pattern = /[?]/;
    // Case 1. Validate if the account has non-recognized characters.
    if (non_valid_pattern.test(account)) {
        return `${account} ILL`;
    }
    // Case 2. Validate checksum.
    else if (validateCheckSum(account)) {
        return `${account} OK`;
    }
    // Case 3. The account does not meet the previous cases.
    else {
        return `${account} ERR`;
    }
}
/* Main Code */
const file_path = 'test_account.txt';

fs.readFile(file_path, 'utf8', (err, file_content) => {
    if (err) {
        console.error('File could not be read!: ', err);
        return;
    }
    const bank_accounts = parseOcrTextFile(file_content);
    bank_accounts.forEach(bank_account => console.log(validateState(bank_account)));
});