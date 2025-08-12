import styles from './Button.module.css';

export function Button({children, onClick, type, buttonType = 'button'}: {children: React.ReactNode, onClick?: () => void, className?: string, type: string, buttonType?: 'button' | 'submit' | 'reset'}) {
    return (
        <button onClick={onClick} className={`${styles[type]} ${styles.btn}`}  type={buttonType}>
            {children}
        </button>
    )
}