import { Triangle } from 'react-loader-spinner'

const LoadingSpinner = () => {
    return (
        <div className=".loading-spinner-wrapper">
            <Triangle
                height="80"
                width="80"
                color="#FFE81F"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    )
}

export default LoadingSpinner
