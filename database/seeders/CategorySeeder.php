<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $parentCategories = ['banken', 'stoelen', 'tafels', 'pied de stalle', 'accessoires', 'divers'];
        foreach ($parentCategories as $category) {
            Category::create([
                'name' => $category,
                'parent_id' => 0
            ]);
        }

        $bankenCategories = ['relaxbanken', 'hoekbanken', 'tuinbanken', '2-zits banken', '3-zits banken', '4-zits banken', 'slaapbanken'];
        $bankParentId = Category::where('name', 'banken')->first()->id;
        foreach ($bankenCategories as $category) {
            Category::create([
                'name' => $category,
                'parent_id' => $bankParentId
            ]);
        }

        $slaapbankenCategories = ['dwarsslapers', 'hoekslapers'];
        $slaapbankParentId = Category::where('name', 'slaapbanken')->first()->id;
        foreach ($slaapbankenCategories as $category) {
            Category::create([
                'name' => $category,
                'parent_id' => $slaapbankParentId
            ]);
        }
    }
}