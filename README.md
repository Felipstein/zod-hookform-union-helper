# `zod-hookform-union-helper`

## Introduction

Developers frequently face challenges when integrating `zod` with `react-hook-form`, particularly when working with discriminated unions.

## The Issue

When using discriminated unions with `zod` and `react-hook-form`, TypeScript often throws type errors that can be confusing. For instance:

Given a union type in `zod`:

```typescript
const FormCertificateSchemaCertificate = z.discriminatedUnion("certificate", [ ... ]);
```

And when integrating it with `react-hook-form`:

```tsx
{watch('certificate') === 'birth' && (
    <Input { ...register('birth.name') } errorFeedback={errors.birth?.message} />
)}
```

TypeScript flags an error at `errors.birth?.message`, indicating that `birth` doesn't exist within `errors`. Technically, this is true until `certificate` is set to `birth`. This means even if your component's logic correctly recognizes the `birth` field once `certificate` is set, TypeScript doesn't acknowledge this initially, leading to unnecessary type errors.

## The Solution: `zod-hookform-union-helper`

The `zod-hookform-union-helper` library leverages TypeScript capabilities to consolidate fragmented error unions into one cohesive type.

### Installation:

```bash
npm install zod-hookform-union-helper
```

### Usage:

There are two primary ways to implement `zod-hookform-union-helper`:

#### 1. Using the `unifyErrors` function:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { unifyErrors } from 'zod-hookform-union-helper'

// ...

const {
    formState: { errors },
} = useForm<FormData>()

const errorsUnified = unifyErrors(errors) // use errorsUnified in your component
```

#### 2. Using TypeScript type casting:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UnifiedErrors } from 'zod-hookform-union-helper'

// ...

const {
    formState: { errors },
} = useForm<FormData>()

const errorsUnified = errors as UnifiedErrors<typeof errors> // use errorsUnified in your component
```

## Examples

Revisiting the scenario described in the "The Issue" section:

Without using `zod-hookform-union-helper`:
```tsx
{watch('certificate') === 'birth' && (
    <Input { ...register('birth.name') } errorFeedback={errors.birth?.message} />
)}
```
With this setup, TypeScript throws a type error at `errors.birth?.message`.

Now, employing `zod-hookform-union-helper`:
```tsx
const errorsUnified = unifyErrors(errors);

{watch('certificate') === 'birth' && (
    <Input { ...register('birth.name') } errorFeedback={errorsUnified.birth?.message} />
)}
```
In this instance, TypeScript acknowledges `errorsUnified.birth?.message` without any issue.

## Requirements

- TypeScript version 3.0 or higher.

## Contributing

Feedback and contributions are welcome! Please open an issue or submit a PR if you have suggestions, improvements, or bug fixes.
