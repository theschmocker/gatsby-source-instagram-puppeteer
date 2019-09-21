const { getImageURIs } = require('./src/instagram');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

module.exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, store, cache }, options) => {
    if (!options.account) {
        throw new Error("Please set 'account' in the plugin options")
    }

    const { createNode } = actions;

    const urls = await getImageURIs(options.account);

    for (let img of urls) {
        const id = createNodeId(`ig-photo-${img}`);
        try {
            const node = ({
                id,
                src: img,
                parent: null,
                children: [],
                internal: {
                    type: 'InstagramPhoto',
                    contentDigest: createContentDigest(img),
                }
            });

            const fileNode = await createRemoteFileNode({
                url: node.src,
                store,
                cache,
                createNode,
                createNodeId,
            })

            if (fileNode) {
                node.localFile___NODE = fileNode.id;
            }

            await createNode(node);
        } catch (e) {
            console.log(e);
        }
    }
}