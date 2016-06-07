# Structuring Applications with Components

As the complexity and size of our application grows we want to divide responsibilities among our components further.

**Smart / Container Components:** which are application specific, higher-level, container components, with access to the application's domain model.

**Dumb / Presentational Components:** which are components responsible for UI rendering and/or behaviour of specific entities passed in via components API (i.e component properties and events). Those components are more in-line with the upcoming Web Component standards.
