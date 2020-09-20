import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const PollsMenu = (props) => (
  <Fragment>
    <h2 className='mt-5'>Feel free to check the poll</h2>
    <div className='list-group list-group-flush polls-menu'>
      <NavLink
        className='list-group-item list-group-item-action mt-2'
        to='/js-polls/1'
      >
        <p>
          {' '}
          JavaScript questions Part1 <i>(16.08.2020)</i>
        </p>
      </NavLink>
      {/* <a  href="#" className="list-group-item list-group-item-action active">
            Cras justo odio */}
      {/* </a>
        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
    <a href="#" class="list-group-item list-group-item-action disabled">Vestibulum at eros</a> */}
    </div>
  </Fragment>
);

export default PollsMenu;
