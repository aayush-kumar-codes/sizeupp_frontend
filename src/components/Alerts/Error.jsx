import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types'

const Error = ({
    error = "Network Error",
    display = false,
    setDisplay = () => { },
    onClose = () => {}
}) => {
    return (

        <div className={`${display ? "absolute  z-50" : "hidden"} w-full max-w-4xl mx-auto top-[12%] left-[45%] `}>
            <div role="alert" className="rounded border-s-4 w-fit  border-red-500 bg-red-50 py-4 px-8">
                <div className="flex items-center gap-2 text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <strong className="flex justify-between font-medium"> Something went wrong <XMarkIcon onClick={() => { setDisplay(false); onClose(); }} className="w-6 ml-4 cursor-pointer" /> </strong>
                </div>

                <p className="mt-2 text-sm text-red-700">
                    {error}
                </p>
            </div>
        </div>
    )
}

Error.propTypes = {
    error: PropTypes.string,
    display: PropTypes.bool,
    setDisplay: PropTypes.func,
    onClose: PropTypes.func
}

export default Error