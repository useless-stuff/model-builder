import React, { ErrorInfo } from 'react'

interface IState {
    error: Error | null
    errorInfo: ErrorInfo | null
}

interface IProps {
    children: React.ReactNode
}

/**
 * Why a class?
 * https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 */
export class ErrorsController extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
    }

    render(): React.ReactNode {
        if (!this.state.errorInfo) {
            return this.props.children
        }
        return (
            <div>
                <h2>Something went wrong...</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error && this.state.error.toString()}
                    <br/>
                    {this.state.errorInfo.componentStack}
                </details>
            </div>
        )
    }
}
