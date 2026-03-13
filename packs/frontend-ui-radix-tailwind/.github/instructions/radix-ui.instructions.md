# Radix UI Component Patterns

Use Radix UI primitives for accessible, unstyled component foundations. These patterns ensure proper accessibility and behavior while allowing complete styling control.

## Core Radix UI Patterns

### Dialog/Modal Pattern

```typescript
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close className="absolute right-4 top-4">
            <button aria-label="Close">×</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```bash

### Dropdown Menu Pattern

```typescript
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white border rounded-lg shadow-lg p-1 min-w-[200px]">
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
```bash

### Form Control Pattern

```typescript
import * as Label from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  children
}) => {
  return (
    <div className="space-y-2">
      <Label.Root htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label.Root>
      {children}
    </div>
  );
};
```bash

## Radix UI Best Practices

1. **Always use semantic HTML** - Radix provides proper semantics automatically
2. **Preserve accessibility** - Don't remove ARIA attributes or roles
3. **Style with data attributes** - Use Radix data attributes for state styling
4. **Handle focus management** - Radix manages focus, don't override unnecessarily
5. **Test with screen readers** - Verify accessibility with actual testing

## Common Radix UI Components

- `@radix-ui/react-dialog` - Modals and dialogs
- `@radix-ui/react-dropdown-menu` - Dropdown menus
- `@radix-ui/react-select` - Select inputs
- `@radix-ui/react-tabs` - Tab navigation
- `@radix-ui/react-tooltip` - Tooltips
- `@radix-ui/react-popover` - Popovers and tooltips
- `@radix-ui/react-switch` - Toggle switches
- `@radix-ui/react-checkbox` - Checkboxes
- `@radix-ui/react-radio-group` - Radio button groups

## Styling Approach

Use Tailwind classes for styling, but reference Radix data attributes for state:

```css
/* Example: Styling based on Radix data attributes */
[data-state="open"] {
  /* Open state styles */
}

[data-state="closed"] {
  /* Closed state styles */
}

[data-disabled] {
  /* Disabled state styles */
}
```bash
