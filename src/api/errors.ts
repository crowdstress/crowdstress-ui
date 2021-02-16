export const codes = {
  CodeUndefined: 0,
  CodeSomethingWentWrong: 1,

  CodeParseFailed: 1001,
  CodeRouteNotFound: 1004,

  CodeUserNotFound: 1100,
  CodePassMismatch: 1101,
  CodeEmailTaken: 1102,
  CodeIncorrectCredentials: 1103,
  CodeEmailInvalid: 1104,
  CodeIncorrectCode: 1105,
  CodeInvalidRegOTP: 1106,
  CodeInvalidPassword: 1107,
  CodeUserBlocked: 1108,
  CodeUserProtected: 1109,
  CodeSameSalt: 1110,
  CodeBreakingRestore: 1111,
  CodeOutdatedPassword: 1112,

  CodeFileInTrash: 1200,
  CodeFileNotFound: 1201,
  CodeWrongFileType: 1203,
  CodeFilenameInvalid: 1204,
  CodeDuplicateName: 1205,
  CodeRecursiveMoving: 1206,

  CodeInvalidSMTPServer: 1300,
  CodeInvalidSMTPPort: 1301,
  CodeInvalidSMTPUser: 1302,
  CodeInvalidSMTPPass: 1303,
  CodeEmptyDomains: 1304,

  CodeSelfAccess: 1400,
  CodeAccessDenied: 1401,
  CodeAccessToOwner: 1403,
  CodeAccessExists: 1404,
  CodeAccessTFAOnly: 1405,
  CodeAccessWrongDir: 1406,

  CodeSharesPasswordRequired: 1500,
  CodeSharesViewsLimit: 1501,

  CodeCryptoRequired: 1601,
  CodeCryptoRejected: 1602,
  CodeBadKeychain: 1603,
  CodeInvalidNonce: 1604,
  CodeCryptoAbort: 1605,
} as const;

type CodeKey = keyof typeof codes;
export type Code = typeof codes[CodeKey];

interface APIError {
  error: {
    code: Code;
    msg: string;
  };
}
type APIErrorFn = () => APIError;

const makeAPIError = (key: CodeKey, msg: string): () => APIError => {
  return (): APIError => ({
    error: {
      code: codes[key],
      msg,
    },
  });
};

export const errUndefined = (msg: string): APIError => ({
  error: {
    code: codes.CodeUndefined,
    msg,
  },
});

export const errSomethingWentWrong: APIErrorFn = makeAPIError('CodeSomethingWentWrong', 'Something went wrong');

export const errParseFailed: APIErrorFn = makeAPIError('CodeParseFailed', 'Failed to parse request');
export const errRouteNotFound: APIErrorFn = makeAPIError('CodeRouteNotFound', 'No such route');

export const errUserNotFound: APIErrorFn = makeAPIError('CodeUserNotFound', 'User not found');
export const errPassMismatch: APIErrorFn = makeAPIError('CodePassMismatch', 'Passwords are different');
export const errEmailTaken: APIErrorFn = makeAPIError('CodeEmailTaken', 'Email is already taken');
export const errIncorrectCredentials: APIErrorFn = makeAPIError('CodeIncorrectCredentials', 'Incorrect credentials');
export const errEmailInvalid: APIErrorFn = makeAPIError('CodeEmailInvalid', 'Invalid email');
export const errIncorrectCode: APIErrorFn = makeAPIError('CodeIncorrectCode', 'Incorrect code');
export const errInvalidRegOTP: APIErrorFn = makeAPIError('CodeInvalidRegOTP', 'Invalid confirmation code');
export const errInvalidPassword: APIErrorFn = makeAPIError('CodeInvalidPassword', 'Invalid password');
export const errUserBlocked: APIErrorFn = makeAPIError('CodeUserBlocked', 'User has been blocked');
export const errUserProtected: APIErrorFn = makeAPIError('CodeUserProtected', 'User is protected');
export const errSameSalt: APIErrorFn = makeAPIError('CodeSameSalt', 'Salt must be different');
export const errBreakingRestore: APIErrorFn = makeAPIError('CodeBreakingRestore', 'Breaking restore rejected');
export const errOutdatedPassword: APIErrorFn = makeAPIError('CodeOutdatedPassword', 'Password reset required');

export const errFileInTrash: APIErrorFn = makeAPIError('CodeFileInTrash', 'File is already in trash');
export const errFileNotFound: APIErrorFn = makeAPIError('CodeFileNotFound', 'File not found');
export const errWrongFileType: APIErrorFn = makeAPIError('CodeWrongFileType', 'Wrong file type (file or directory)');
export const errFilenameInvalid: APIErrorFn = makeAPIError('CodeFilenameInvalid', 'File name is invalid');
export const errDuplicateName: APIErrorFn = makeAPIError('CodeDuplicateName', 'Name is already taken');
export const errRecursiveMoving: APIErrorFn = makeAPIError('CodeRecursiveMoving', 'Recursive directory moving');

export const errInvalidSMTPServer: APIErrorFn = makeAPIError('CodeInvalidSMTPServer', 'SMTP server is invalid');
export const errInvalidSMTPPort: APIErrorFn = makeAPIError('CodeInvalidSMTPPort', 'SMTP port is invalid');
export const errInvalidSMTPUser: APIErrorFn = makeAPIError('CodeInvalidSMTPUser', 'SMTP username is invalid');
export const errInvalidSMTPPass: APIErrorFn = makeAPIError('CodeInvalidSMTPPass', 'SMTP password is invalid');
export const errEmptyDomains: APIErrorFn = makeAPIError('CodeEmptyDomains', 'Domains list is empty');

export const errSelfAccess: APIErrorFn = makeAPIError('CodeSelfAccess', 'Attempt to grant access to oneself');
export const errAccessDenied: APIErrorFn = makeAPIError('CodeAccessDenied', 'Access denied');
export const errAccessToOwner: APIErrorFn = makeAPIError('CodeAccessToOwner', 'Attempt to grant access to file owner');
export const errAccessExists: APIErrorFn = makeAPIError('CodeAccessExists', 'Access has been already granted');
export const errAccessTFAOnly: APIErrorFn = makeAPIError('CodeAccessTFAOnly', 'Access can be granted only for user with TFA');
export const errAccessWrongDir: APIErrorFn = makeAPIError('CodeAccessWrongDir', 'Wrong directory to create common access');

export const errSharesPasswordRequired: APIErrorFn = makeAPIError('CodeSharesPasswordRequired', 'Password is required for url shares');
export const errSharesViewsLimit: APIErrorFn = makeAPIError('CodeSharesViewsLimit', 'Incorrect value for views limit');

export const errCryptoRequired: APIErrorFn = makeAPIError('CodeCryptoRequired', 'Encryption required');
export const errCryptoRejected: APIErrorFn = makeAPIError('CodeCryptoRejected', 'Encryption rejected');
export const errBadKeychain: APIErrorFn = makeAPIError('CodeBadKeychain', 'Parents\' key doesn\'t match');
export const errInvalidNonce: APIErrorFn = makeAPIError('CodeInvalidNonce', 'Invalid nonce');
export const errCryptoAbort: APIErrorFn = makeAPIError('CodeCryptoAbort', 'Trying get archive with crypto file');
