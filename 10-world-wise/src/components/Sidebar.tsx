import { Outlet } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { Logo, AppNav } from './';

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} World Wise Inc.
                </p>
            </footer>
        </div>
    )
}