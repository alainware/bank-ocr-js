# Bank OCR

This project implements a functionality to parse from OCR to digit.

## Author

| Author                     |
| -------------------------- |
| Irving Alain Aguilar Pérez |

## Index
- [Bank OCR](#bank-ocr)
  - [Author](#author)
  - [Index](#index)
  - [Usage](#usage)
    - [Pre-requisites](#pre-requisites)
    - [Execution](#execution)
    - [Output](#output)

## Usage

The project was developed using Node.js `v20.14.0`.

### Pre-requisites

You should define an input file that contains the OCR bank accounts. For this implementation, the `test_account.txt` file is provided.

### Execution

Run the file as follows:

```bash=
$ node bank-ocr.js
 ```
### Output

The output of the script will be written in `output.txt` file.

```txt=
000000000 OK
111111111 ERR
222222222 ERR
333333333 ERR
444444444 ERR
555555555 ERR
666666666 ERR
777777777 ERR
888888888 ERR
999999999 ERR
123456789 OK
000000051 OK
49006771? ILL
1234?678? ILL
```