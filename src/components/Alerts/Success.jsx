import PropTypes from "prop-types"
import { XMarkIcon } from "@heroicons/react/24/outline"

const Success = ({
    message = "Changes saved",
    setDisplay = () => { },
    display = false,
    onClose = () => {}
}) => {
    return (
        <div className={`${display ? "absolute  z-50" : "hidden"} w-full max-w-4xl mx-auto top-[12%] left-[45%] `}>
            <div role="alert" className="rounded-xl border border-gray-100 w-fit bg-white p-4">
                <div className="flex items-start gap-4">
                    <span className="text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>

                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">Great Job!</strong>

                        <p className="mt-1 text-sm text-gray-700">{message}</p>
                    </div>

                    <button className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>
                        <XMarkIcon onClick={() => { setDisplay(false); onClose(); }} className="w-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}

Success.propTypes = {
    message: PropTypes.string,
    setDisplay: PropTypes.func,
    display: PropTypes.bool,
    onClose: PropTypes.func
}

export default Success