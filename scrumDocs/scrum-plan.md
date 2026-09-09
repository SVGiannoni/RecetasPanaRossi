# Plan de Requerimientos —  RecetasPanaRossi

_Generado automáticamente el 2026-09-09T11:55:32.613Z — no editar a mano, se sobreescribe en cada publicación._

Orden sugerido de desarrollo (respeta dependencias entre Requerimientos). Cada fila indica de qué Requerimientos depende, si tiene.

| Orden | Código | Requerimiento | Historia de Usuario | Módulo | Entrega | Estado | Desarrollador | Depende de | Rechazos |
|---|---|---|---|---|---|---|---|---|---|
| 1 | RF-01 | Formulario de alta y validación de recetas | HU-01 | — | — | testing | dev2-dashboard | — | — |
| 2 | RF-01 | Configuración y puesta en marcha de VM de testing | RO-01 | — | — | testing | Sin asignar | — | — |
| 3 | RF-02 | Servicio de persistencia y publicación en catálogo | HU-01 | — | — | testing | dev2-dashboard | RF-01 | — |
| 4 | RF-01 | Búsqueda por palabra clave e ingredientes | HU-02 | — | — | Hecho | dev-recetaspanarossi | RF-02 | — |
| 5 | RF-02 | Filtros por categoría y mensaje de resultados vacíos | HU-02 | — | — | Hecho | dev-recetaspanarossi | RF-01 | — |
| 6 | RF-01 | Acción para marcar y desmarcar favoritas | HU-03 | — | — | Hecho | dev-recetaspanarossi | RF-02 | — |
| 7 | RF-02 | Sección 'Mis Favoritas' en perfil | HU-03 | — | — | Hecho | dev-recetaspanarossi | RF-01 | — |
| 8 | RF-01 | testing del HU-01 | RO-02 | — | 1ra Entrega | Hacer | QA | RF-01, RF-02 | — |
| 9 | RF-01 | testing de HU-02 | RO-03 | — | 1ra Entrega | Hacer | QA | RF-01 | — |
| 10 | RF-01 | testing de HU-03 | RO-04 | — | 1ra Entrega | Hacer | QA | RF-01 | — |
| 11 | RF-01 | Testeo completado y Aprobado | RO-05 | — | 1ra Entrega | Hacer | sm-recetaspanarossi | RF-01 | — |

## Detalle

### RF-01 — Formulario de alta y validación de recetas
Implementacion de HU-01 finalizada y verificada. Frontend interactivo y pruebas unitarias. PR #3 abierto hacia dev.
- Estimado: 0h

### RF-01 — Configuración y puesta en marcha de VM de testing
Dockerfile y docker-compose agregados y configurados. PR #2 abierto en GitHub hacia dev.
- Estimado: 6h

### RF-02 — Servicio de persistencia y publicación en catálogo
Servicio de persistencia y catalogo completado y verificado. 3/3 pruebas unitarias pasadas.
- Estimado: 0h

### RF-01 — Búsqueda por palabra clave e ingredientes
Pull Request #7 abierto en GitHub hacia dev.
- Estimado: 0h

### RF-02 — Filtros por categoría y mensaje de resultados vacíos
Pull Request #8 abierto en GitHub hacia dev.
- Estimado: 0h

### RF-01 — Acción para marcar y desmarcar favoritas
Pull Request #9 abierto en GitHub hacia dev.
- Estimado: 0h

### RF-02 — Sección 'Mis Favoritas' en perfil
Pull Request #4 abierto en GitHub hacia dev.
- Estimado: 0h

### RF-01 — testing del HU-01
- Estimado: 2h

### RF-01 — testing de HU-02
- Estimado: 4h

### RF-01 — testing de HU-03
- Estimado: 2h

### RF-01 — Testeo completado y Aprobado
- Estimado: 0h
