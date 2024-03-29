import { contentAtVerify } from '../Verify'
import replaceAtToTag from './replaceAtToTag'

/**
 * {comment, at, pid}
 * @param commentObj
 * @returns {*}
 */
export default function parseToValidCommentAt(commentObj) {
  const { comment, at, pid } = commentObj
  if (at !== '' && pid !== '') {
    if (!contentAtVerify(comment, at)) {
      return { comment, pid: '', at: '' }
    } else {
      return { comment: replaceAtToTag(comment, pid, at), pid, at }
    }
  }
  return commentObj
}
