import { useMount } from 'ahooks'
import { usePostHog } from 'posthog-react-native'
import React, { ErrorInfo, PropsWithChildren } from 'react'
import ErrorComponent from '../Error'
import ScreenContainer from '../ScreenContainer'

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  { hasError: boolean; error: string; stackTrace: string }
> {
  constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false, error: '', stackTrace: '' }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState((prev) => ({
      ...prev,
      error: JSON.stringify(error),
      stackTrace: JSON.stringify(info)
    }))
  }

  override render() {
    if (this.state.hasError) {
      return <ErrorScreen {...this.state} />
    }

    return this.props.children
  }
}

type ErrorScreenProps = {
  error: string
  stackTrace: string
}

const ErrorScreen = ({ error, stackTrace }: ErrorScreenProps) => {
  const postHog = usePostHog()

  useMount(() => {
    postHog.capture('render_error', {
      error,
      stackTrace
    })
  })

  return (
    <ScreenContainer className='p-4'>
      <ErrorComponent
        caption='An evil error occurred!'
        description={`Before you get lost in the warp, you may want to report this issue in our Discord.\n\nPlease restart Appdeptus.`}
        title='Heresy!'
      />
    </ScreenContainer>
  )
}

export default ErrorBoundary
