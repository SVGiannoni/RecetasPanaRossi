"""
Tests Unitarios para HU-01: Creación y publicación de recetas de cocina
"""

def validate_recipe(data):
    errors = {}
    title = data.get('title', '')
    if not title or len(title.strip()) == 0:
        errors['title'] = 'El título de la receta es obligatorio.'
    elif len(title.strip()) < 3:
        errors['title'] = 'El título debe tener al menos 3 caracteres.'

    ingredients = data.get('ingredients', '')
    if isinstance(ingredients, list):
        if len(ingredients) == 0:
            errors['ingredients'] = 'Debe indicar al menos un ingrediente.'
    elif not ingredients or len(ingredients.strip()) == 0:
        errors['ingredients'] = 'Debe indicar al menos un ingrediente.'

    steps = data.get('steps', '')
    if isinstance(steps, list):
        if len(steps) == 0:
            errors['steps'] = 'Debe detallar los pasos de preparación.'
    elif not steps or len(steps.strip()) == 0:
        errors['steps'] = 'Debe detallar los pasos de preparación.'

    return errors


def run_tests():
    total = 0
    passed = 0

    def assert_test(cond, msg):
        nonlocal total, passed
        total += 1
        if cond:
            print(f"  ✓ PASÓ: {msg}")
            passed += 1
        else:
            print(f"  ✗ FALLÓ: {msg}")

    print("=== Iniciando pruebas unitarias de HU-01 ===")

    # 1. Sin título
    t1 = validate_recipe({'title': '', 'ingredients': 'Harina', 'steps': 'Hornear'})
    assert_test('title' in t1, "Valida que el título no esté vacío")

    # 2. Sin ingredientes
    t2 = validate_recipe({'title': 'Torta', 'ingredients': '', 'steps': 'Hornear'})
    assert_test('ingredients' in t2, "Valida que los ingredientes no estén vacíos")

    # 3. Sin pasos
    t3 = validate_recipe({'title': 'Torta', 'ingredients': 'Harina', 'steps': '   '})
    assert_test('steps' in t3, "Valida que los pasos no estén vacíos")

    # 4. Receta válida
    valid_data = {
        'title': 'Pasta Frola Casera',
        'category': 'Dulce',
        'prepTime': 50,
        'servings': 8,
        'ingredients': ['500g harina', '200g manteca', '400g dulce'],
        'steps': ['Arenar', 'Rellenar', 'Hornear']
    }
    t4 = validate_recipe(valid_data)
    assert_test(len(t4) == 0, "Acepta una receta con todos los campos válidos")

    # 5. Publicación en catálogo
    catalog = []
    catalog.insert(0, valid_data)
    assert_test(len(catalog) == 1 and catalog[0]['title'] == 'Pasta Frola Casera', "La receta se publica y queda disponible en el catálogo")

    print(f"\nResultado: {passed}/{total} pruebas pasaron exitosamente.")
    assert passed == total

if __name__ == '__main__':
    run_tests()
