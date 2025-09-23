# @reactive-forms/core

## 0.12.5

### Patch Changes

-   082ab4e: Improved validateField function soundness: now validations are not skipped, if field doesn't have direct validator registered

## 0.12.4

### Patch Changes

-   5ccf8e0: Add cleanup for batch observer
-   Updated dependencies [2f2aa13]
    -   stocked@1.1.3

## 0.12.3

### Patch Changes

-   f01b66e: Fix bug with incosistent dirty/validation state of form
-   df4db1e: Expose FormContext type

## 0.12.2

### Patch Changes

-   c743105: Remove exports conditions
-   Updated dependencies [c743105]
    -   stocked@1.1.2
    -   pxth@0.9.2

## 0.12.1

### Patch Changes

-   Updated dependencies [de2804c]
    -   stocked@1.1.1
    -   pxth@0.9.1

## 0.12.0

### Minor Changes

-   95a44c8: Fix double Pxth BrandKey declaration

### Patch Changes

-   Updated dependencies [95a44c8]
    -   stocked@1.1.0
    -   pxth@0.9.0

## 0.11.2

### Patch Changes

-   4baad08: Upgraded pxth - make Pxth<any> assignable to any Pxth
-   363bb0e: Moved stocked into monorepo
-   Updated dependencies [afd8d8a]
-   Updated dependencies [4baad08]
-   Updated dependencies [363bb0e]
    -   pxth@0.8.0
    -   stocked@1.0.0

## 0.11.1

### Patch Changes

-   f50eb4d: Bump stocked

## 0.11.0

### Minor Changes

-   8c8928e: Bump stocked version

## 0.10.7

### Patch Changes

-   225ac9e: Fixed bug when error set on array type was overwritten by errors from any item in array (error object was replaced with array)

## 0.10.4

### Patch Changes

-   5edbd92: Updated pxth version

## 0.10.3

### Patch Changes

-   4aa91ac: Updating form dirtiness on reset

## 0.10.2

### Patch Changes

-   de9d96e: Configured provenance

## 0.10.1

### Patch Changes

-   a9f3263: Fixed inconsistency between validateBranch and validateAllFields results

## 0.10.0

### Minor Changes

-   7bee1a9: Changed validateField function signature and functionality. This function now optionally accepts value parameter and calls validateBranch in order to get all errors associated with a field.

## 0.9.1

### Patch Changes

-   4788033: Fixed bug with discarding an error in validateBranch function
-   2323e4f: Merge errors from multiple validators on the same field

## 0.9.0

### Minor Changes

-   dcc9ef5: Removed load prop functionality

## 0.8.16

## 0.8.15

## 0.8.14

### Patch Changes

-   708a17b: Test release script

## 0.8.13

## 0.8.12

### Patch Changes

-   b4ded44: Automating publishing via changesets
