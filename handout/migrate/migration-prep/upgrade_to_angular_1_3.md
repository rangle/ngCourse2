# Upgrade to Angular 1.3+ Style

The first step of any migration is to upgrade the codebases style to conform
to Angular 1.3+ style, ideally an Angular 1.5+ style.  This means:

- All controllers should be in `controllerAs` form, and should ideally only
exist on directives
- Use directives, specifically "component directives", that use the following
properties:
    - `restrict: 'E'`
    - `scope: {}`
    - `bindToController: {}`
    - `controllerAs`
    - `template` or `templateUrl`
    - `transclude` (optional)
    - `require` (optional)
Component directives should _not_ use the following atrtributes:
    - `compile`
    - `replace: true`
    - `priority`/`terminal`
- Ideally have one component, or one _thing_ per file
- Ideally have folders organized by feature


