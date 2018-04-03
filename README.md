# react-canvas-demo

基于dva和konva的一个canvas编辑图片的demo

最近由于工作需要，搞了这玩意儿。

`clone` 下来，`yarn` 一下，再 `yarn start` 就好啦。

**注意1：`canvas-demo index.js`里面有一个判断是`if(stageNode)`, 这个地方不能写成`if(stageNode&&(selectedShape === 'add-rect' || selectedShape === 'add-arrow' || selectedShape === 'add-note'))`, 之前的判断是这么写的。。。其实是多余的。重点是！这样会导致一个问题：当`selectedShape`变成其他的，比如说`reload`以后，再在`stageNode`上点击时，`stageNode.off('mousedown').on('mousedown')`还会被触发！因为！页面之前渲染的时候`if(stageNode&&(selectedShape === 'add-rect' || selectedShape === 'add-arrow' || selectedShape === 'add-note'))`为真，`stageNode.off('mousedown').on('mousedown')`已经被绑定了！。。。。好像没说清楚，希望以后我还能看明白这儿写的啥 = =**

**注意2：`canvas-demo index.js`里面`stageNode.off('mousedown').on('mousedown', () => {})`，在`on('mousedown', () => {})`之前一定要`off('mousedown')`，因为`on('mousedown', () => {})`的回调里面有`draw()`事件的话，会死循环～～～**
