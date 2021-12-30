import React from 'react';

import styles from './SideBar.module.scss';

const SideBar: React.FC = ({ children }) => <div className={styles['sidebar']}>{children}</div>;
export default SideBar;
