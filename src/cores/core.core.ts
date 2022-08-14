import urlJoin from 'url-join'

export class Core {
  static DefaultAPI = (path = '') => {
    return urlJoin('https://carebeauplus.amn-corporation.com', path)
  }
}