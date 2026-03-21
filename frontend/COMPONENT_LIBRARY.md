# Component Library Documentation

## Overview
A comprehensive UI component library for AutoHaus Premium with consistent styling and premium feel.

---

## Components

### Button
Versatile button component with multiple variants and states.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'

**Usage:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Speichern
</Button>

<Button variant="danger" loading>
  Löschen
</Button>

<Button icon={<Plus />} iconPosition="left">
  Hinzufügen
</Button>
```

**Variants:**
- **Primary**: Amber/orange gradient, white text
- **Secondary**: Gray background
- **Outline**: Border with transparent background
- **Ghost**: Transparent with hover effect
- **Danger**: Red background for destructive actions

---

### Input
Text input with label, error states, and icon support.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'

**Usage:**
```tsx
import { Input } from '@/components/ui';

<Input
  label="E-Mail"
  type="email"
  required
  error={errors.email}
  helperText="Wir werden Ihre E-Mail niemals weitergeben"
/>

<Input
  icon={<Search />}
  placeholder="Suchen..."
/>
```

---

### Select
Dropdown select with custom styling.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string

**Usage:**
```tsx
import { Select } from '@/components/ui';

<Select label="Marke" required>
  <option value="">Bitte wählen</option>
  <option value="BMW">BMW</option>
  <option value="Mercedes">Mercedes-Benz</option>
</Select>
```

---

### Card
Container component with variants for different use cases.

**Variants:**
- `default`: Standard card
- `hover`: Card with hover effect
- `stats`: Stats card with left border

**Sub-components:**
- `CardHeader`: Header section with border
- `CardContent`: Main content area
- `CardFooter`: Footer section with border

**Usage:**
```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

<Card variant="hover">
  <CardHeader>
    <h3>Titel</h3>
  </CardHeader>
  <CardContent>
    <p>Inhalt</p>
  </CardContent>
  <CardFooter>
    <Button>Aktion</Button>
  </CardFooter>
</Card>
```

---

### Badge
Status and label badges with color variants.

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info' | 'exclusive'

**Usage:**
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Neu</Badge>
<Badge variant="exclusive">Exklusiv</Badge>
<Badge variant="error">Ausverkauft</Badge>
```

---

### Modal
Dialog/modal component with backdrop and animations.

**Props:**
- `open`: boolean
- `onClose`: () => void
- `title`: string

**Sub-components:**
- `ModalContent`: Content area
- `ModalActions`: Action buttons area

**Usage:**
```tsx
import { Modal, ModalContent, ModalActions, Button } from '@/components/ui';

<Modal open={isOpen} onClose={handleClose} title="Bestätigung">
  <ModalContent>
    <p>Möchten Sie fortfahren?</p>
  </ModalContent>
  <ModalActions>
    <Button variant="outline" onClick={handleClose}>
      Abbrechen
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Bestätigen
    </Button>
  </ModalActions>
</Modal>
```

---

### Spinner
Loading spinner component.

**Props:**
- `size`: 'sm' | 'md' | 'lg'

**Usage:**
```tsx
import { Spinner } from '@/components/ui';

<Spinner size="md" />
```

---

### Skeleton
Loading placeholder components.

**Components:**
- `Skeleton`: Basic skeleton
- `SkeletonCard`: Pre-built card skeleton

**Usage:**
```tsx
import { Skeleton, SkeletonCard } from '@/components/ui';

<Skeleton className="h-4 w-full" />
<SkeletonCard />
```

---

## Theme

### Colors

**Primary (Blue):**
- Used for main actions and links
- Shades: 50-950

**Amber/Orange:**
- Accent color for premium feel
- Used for exclusive items, highlights
- Shades: 50-950

**Charcoal:**
- Deep blue-gray for text and backgrounds
- Professional, premium feel
- Shades: 50-950

**Semantic Colors:**
- Success: Green
- Error: Red
- Warning: Yellow
- Info: Blue

### Typography

**Font Family:**
- Primary: Inter
- Fallback: system-ui, sans-serif

**Hierarchy:**
- h1: 3xl-5xl, bold
- h2: 2xl-3xl, bold
- h3: xl-2xl, semibold
- Body: base, regular
- Small: sm, regular

### Spacing

Consistent spacing scale:
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### Shadows

- sm: Subtle shadow for cards
- md: Standard shadow
- lg: Prominent shadow for modals
- soft: Custom soft shadow

### Border Radius

- sm: 0.375rem (6px)
- md: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)

---

## Best Practices

### Consistency
- Use components instead of custom styling
- Follow the established color palette
- Maintain consistent spacing

### Accessibility
- All interactive elements have focus states
- Proper ARIA labels
- Keyboard navigation support

### Performance
- Components are optimized with forwardRef
- Minimal re-renders
- Lazy loading where appropriate

### German Localization
- All text in German
- Proper date/number formatting
- Currency in EUR (€)

---

## Examples

### Form Example
```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    required
    error={errors.name}
  />
  <Select
    label="Marke"
    required
  >
    <option value="">Bitte wählen</option>
    <option value="BMW">BMW</option>
  </Select>
  <Button type="submit" loading={isSubmitting}>
    Speichern
  </Button>
</form>
```

### Card Grid Example
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cars.map(car => (
    <Card key={car.id} variant="hover">
      <CardContent>
        <h3>{car.brand} {car.model}</h3>
        <Badge variant="exclusive">Exklusiv</Badge>
        <p>{formatPrice(car.price)}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Modal Example
```tsx
<Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
  <ModalContent>
    <p>Möchten Sie dieses Fahrzeug wirklich löschen?</p>
  </ModalContent>
  <ModalActions>
    <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
      Abbrechen
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Löschen
    </Button>
  </ModalActions>
</Modal>
```

---

## Future Enhancements

- [ ] Dark mode support
- [ ] Additional input types (date picker, file upload)
- [ ] Toast notification component
- [ ] Tooltip component
- [ ] Dropdown menu component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Progress bar component
