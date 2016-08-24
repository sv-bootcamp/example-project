/**
 * Created by wpdud on 2016-08-24.
 */

import {connect} from 'react-redux';
import Maps from '../components/maps';

const mapDispatchToProps = {
  //TBD
};

function mapStateToProps(state) {
  return {
    a: state //need to change
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
