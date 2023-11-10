<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Koji Admin',
            'user_name' => 'koji_admin',
            'email' => 'koji@koji.com',
            'password' =>bcrypt('password'),
            'level'=>1
        ]);
    }
}
