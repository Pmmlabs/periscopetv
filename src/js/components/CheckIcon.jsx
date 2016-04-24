"use strict";

var React = require("react");

var checkIconSVG = "<svg width=\"30px\" height=\"30px\" viewBox=\"0 0 30 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#49D68C\" cx=\"15\" cy=\"15\" r=\"15\"></circle><path d=\"M20.5,11.0869565 L13.2872054,18.9130435 L10.5,16.0664575\" stroke=\"#FFFFFF\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></g></svg>";

var CheckIcon = React.createClass({
  displayName: "CheckIcon",

  render: function render() {
    return React.createElement("div", { className: "CheckIcon", dangerouslySetInnerHTML: { __html: checkIconSVG } });
  }
});

module.exports = CheckIcon;
