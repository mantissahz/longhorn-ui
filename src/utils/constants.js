const { LH_UI_VERSION } = process.env

const C = {
  RegExp: {
    // Regular expressions ensure that only the correct request path is included
    REQUEST: /^(https|wss)?.+?(:\d{2,6})?(?=\/v1)/,
  },
  ContainerMarginHeight: 101,
}

export default C
export { LH_UI_VERSION }
