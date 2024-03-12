import { ZodError, ZodIssue } from 'zod'

export const ZodErrorMessageGenerator = (err: ZodError): string => {
  let errorMessage: string = ''
  err.issues.forEach(
    (issue: ZodIssue) => (errorMessage = errorMessage + ` ${issue.message}.`),
  )
  return errorMessage
}
