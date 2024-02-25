'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import Sample from '@/features/sample/components/Sample'
import { Suspense } from 'react'

export default function Container() {
	return (
		<div>
			aaa
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Suspense fallback={<div>loading...</div>}>
					<Sample />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
