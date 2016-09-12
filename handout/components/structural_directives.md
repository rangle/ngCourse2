# Structural Directives

Angular's structural directives change the DOM layout by adding and removing DOM elements. For example:

```html
<div *ngIf="hero">{{ hero }}</div>

<div *ngFor="let hero of heroes">{{ hero }}</div>

<div [ngSwitch]="status">
  <template *ngSwitchCase="'in-mission'">In Mission</template>
  <template *ngSwitchCase="'ready'">Ready</template>
  <template *ngSwitchDefault>Unknown</template>
</div>
```

