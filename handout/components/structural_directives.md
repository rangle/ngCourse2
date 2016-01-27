# Structural Directives

Angular's structural directives change the DOM layout by adding and removing DOM elements. For example:

```html
<div *ngIf="hero">{{ hero }}</div>

<div *ngFor="#hero of heroes">{{ hero }}</div>

<div [ngSwitch]="status">
  <template [ngSwitchWhen]="'in-mission'">In Mission</template>
  <template [ngSwitchWhen]="'ready'">Ready</template>
  <template ngSwitchDefault>Unknown</template>
</div>
```

