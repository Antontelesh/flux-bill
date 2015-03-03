import React from 'react';

export default React.createClass({

  render() {
    return <article className="content">{this.props.children}</article>
  }

});
