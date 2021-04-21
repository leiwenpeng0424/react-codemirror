import React from "react"

type LifecycleProps = {
  didMount?: () => void
  willUnmount?: () => void
}

type LifecycleState = {}

/**
 * @public
 */
export default class Lifecycle extends React.PureComponent<
  LifecycleProps,
  LifecycleState
> {
  componentDidMount() {
    this.props.didMount && this.props.didMount()
  }

  componentWillUnmount() {
    this.props.willUnmount && this.props.willUnmount()
  }

  render() {
    return this.props.children
  }
}
