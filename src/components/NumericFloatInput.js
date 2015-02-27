import React from 'react';
import InputMixin from '../mixins/Input';
import InputNumericFloat from '../mixins/InputNumericFloat';

export default React.createClass({
  mixins: [InputMixin, InputNumericFloat]
});
