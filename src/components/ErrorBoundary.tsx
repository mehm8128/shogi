import { ReactElement } from 'react'
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary'

export function ErrorBoundary({
	fallback,
	children
}: { fallback: ReactElement; children: React.ReactNode }) {
	return <BaseErrorBoundary fallback={fallback}>{children}</BaseErrorBoundary>
}
