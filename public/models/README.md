# Modelo 3D

Coloca aquí el archivo del compactador en formato `.glb` (por ejemplo `compactor.glb`).

El componente `CompactorCanvas` cargará el modelo con:

```ts
useGLTF('/models/compactor.glb')
```

Si no hay ningún `.glb`, se muestra un placeholder geométrico (base, pistón y palanca).
