import React from 'react';

export default React.createClass({

  render() {
    return <aside className="sidebar">{this.props.children}</aside>
  }

});
