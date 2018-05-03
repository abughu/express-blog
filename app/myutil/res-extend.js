'use strict'
const lodash = require('lodash')

const errorCode = require('../config/error-code')
module.exports = (req,res,next) => {
  const extendAttr = {
    sendOk: (option) => {
      let rst = {}
      if (option.msg) {
        rst = {
          status: 200,
          errorCode: errorCode[option.msg].errorCode,
          errorMsg: errorCode[option.msg].errorMsg
        }
      } else {
        rst = {
          status: 200,
          errorCode: 0,
          data: option
        }
      }
      return res.json(lodash.extend(rst))
    },
    sendErr: (option) => {
      const rst = {
        status: 200,
        errorCode: errorCode[option].errorCode,
        msg: errorCode[option].errorMsg
      }
      return res.json(lodash.extend(rst))
    }
  }
  lodash.extend(res,extendAttr)
  next()
}