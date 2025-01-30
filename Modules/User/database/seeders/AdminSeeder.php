<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\User\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
                // user
            'user',

                // server
            'server',

                // module
            'module',

                // on or off server
            'server/status',

                // log
            'log',

        ];



        foreach ($permissions as $permission)
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);



        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $allPermissions = Permission::all();

        $adminRole->syncPermissions($allPermissions);

        $admin = User::firstOrCreate(
            ['auth_name' => 'ownerApp'],
            [
                'first_name' => 'Admin',
                'last_name' => 'Admin',
                'password' => Hash::make('password'),
            ],
        );

        $admin->assignRole($adminRole);





            // visitor
        $visitorRole = Role::firstOrCreate(['name' => 'visitor']);

            // expert
        $visitorRole = Role::firstOrCreate(['name' => 'expert']);
        $permissions = Permission::whereIn('name', ['server', 'server', 'server/status'])->get();
        $visitorRole->syncPermissions($permissions);


    }
}
