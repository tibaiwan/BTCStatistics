const { default: axios } = require("axios")



const lineURL = 'https://gate.qkl123.com/w1/ticker/kline'
const reqParams = {
  pair: 'btc_usd',
  exchange: 'huobipro'
}

// pair=btc_usd&exchange=huobipro&level=1hour&count=200&end_time=1631409926&type=&rehabilitation=false

const init = async () => {
  try {
    const result = await axios.request({
      url: 'https://gate.qkl123.com/w1/ticker/kline?pair=btc_usd&exchange=huobipro&level=1hour&count=200&end_time=1631409926&type=&rehabilitation=false',
      headers: {
        from: 'web',
        'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36`,
      },
      Host: 'gate.qkl123.com',
      Origin: 'https://www.qkl123.com',
      'sec-ch-ua': `"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"`,
      'sec-ch-ua-mobile': '?0',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'Source-Site': 'qkl123',
      Authorization: {
        secretKeyVersion: 1,
        sign: 'gDt1nQ3Ay458FG_Xj-Aum-Ru9myLYXGqSeVi54v5_JPUw0kKy0pymJXkcFu445jvTWeDNrlOJirimPSo2PO0DQ=='
      },
    })
    // console.log('TODO result', result)
  } catch (error) {
    console.error('error', error)
  }
}

init()