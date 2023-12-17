import { styles } from "../../style"
import PropTypes from 'prop-types'

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
                gridSize == 5 && (
                    <div className={`grid grid-cols-5 gap-10 ${styles.padding}`}>
                        {children}
                    </div>
                )
            }
        </>
    )
}

CustomGrid.propTypes = {
    gridSize: PropTypes.number,
    children: PropTypes.node
}
