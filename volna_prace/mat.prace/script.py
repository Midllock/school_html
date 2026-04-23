import json

def load_ingredients(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        merged = {}
        for item in data:
            idx = item['id']
            if idx in merged:
                merged[idx]['quantity'] += item['qty']
            else:
                merged[idx] = {
                    'id': idx,
                    'name': item['nm'],
                    'quantity': item['qty']
                }
        return list(merged.values())
    except FileNotFoundError:
        return []

def sort_ingredients(ingredients_list):
    return sorted(ingredients_list, key=lambda x: x['name'])

def calculate_portions(ingredients, adults, children):
    total_portions = adults + (children * 0.5)
    result = []
    for ing in ingredients:
        new_ing = ing.copy()
        new_ing['quantity'] = ing['quantity'] * total_portions
        result.append(new_ing)
    return result

# --- Demonstrace užití ---
# Simulace souboru (v praxi by se načetlo ze souboru)
# data.json obsahuje: [{"id": 1, "nm": "Mouka", "qty": 500}, {"id": 2, "nm": "Cukr", "qty": 10}, ...]

ingredients = load_ingredients('ingredients.json')
sorted_list = sort_ingredients(ingredients)
portions_calc = calculate_portions(sorted_list, 2, 1) # 2 dospělí, 1 dítě = 2.5 porce

print("Přepočítané ingredience (2.5 porce):")
for item in portions_calc:
    print(f"{item['name']}: {item['quantity']}")