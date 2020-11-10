import primaryrender from './primaryrenderer';
import plainrender from './plainrenderer';

const renderers = {
  primary: primaryrender,
  plain: plainrender,
  json: JSON.stringify,
};

const render = (renderType) => renderers[renderType];

export default render;
