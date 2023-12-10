import { styles } from "../../style"

export const CustomGrid = ({
    gridSize = 2,
    children
}) => {
    return(
        <>
            {
                gridSize == 1 && (
                    <div className={`grid grid-cols-1 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
            {
                gridSize == 2 && (
                    <div className={`grid grid-cols-2 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
            {
                gridSize == 3 && (
                    <div className={`grid grid-cols-3 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
            {
                gridSize == 4 && (
                    <div className={`grid grid-cols-4 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
            {
                gridSize == 6 && (
                    <div className={`grid grid-cols-6 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
        </>
    )
}