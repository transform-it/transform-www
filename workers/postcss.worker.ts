import postcssJs from "postcss-js";
import postcss from "postcss";

const _self: any = self;

_self.onmessage = ({ data: { payload, id } }) => {
  const root = postcss.parse(payload);

  _self.postMessage({
    id,
    payload: JSON.stringify(postcssJs.objectify(root))
  });
};
